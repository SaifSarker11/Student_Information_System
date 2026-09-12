import React, { useState, useRef } from 'react';
import { studentData } from '../data/flowData';
import { X, Image as ImageIcon, Check, RotateCcw, Link as LinkIcon, Upload, Camera } from 'lucide-react';

interface HotlinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarUrl: string;
  campusUrl: string;
  onUpdateUrls: (avatar: string, campus: string) => void;
}

export const HotlinkModal: React.FC<HotlinkModalProps> = ({
  isOpen,
  onClose,
  avatarUrl,
  campusUrl,
  onUpdateUrls
}) => {
  const [tempAvatar, setTempAvatar] = useState(avatarUrl);
  const [tempCampus, setTempCampus] = useState(campusUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateUrls(tempAvatar, tempCampus);
    onClose();
  };

  const handleReset = () => {
    setTempAvatar(studentData.avatarUrl || '');
    setTempCampus(studentData.campusPhotoUrl || '');
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setTempAvatar(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-white rounded-3xl border border-stone-200 w-full max-w-lg p-6 shadow-2xl text-stone-900 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-[#8C1515] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900">
                Student Photo & Campus Media
              </h3>
              <p className="text-xs text-stone-500">
                Upload student ID photo or customize campus visuals for {studentData.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs">
          {/* Avatar Upload / Drop Zone */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 flex items-center justify-between">
              <span>{studentData.name}'s ID Portrait Photo</span>
              <span className="text-[10px] text-stone-400 font-normal">
                (Drag & drop photo or paste URL)
              </span>
            </label>

            {/* Drag and Drop Box */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-3.5 flex items-center gap-3.5 cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[#8C1515] bg-red-50/50'
                  : 'border-stone-300 hover:border-stone-400 bg-stone-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    processFile(e.target.files[0]);
                  }
                }}
              />
              <div className="w-14 h-16 rounded-xl overflow-hidden border-2 border-white shadow-xs shrink-0 bg-stone-200">
                <img
                  src={tempAvatar}
                  alt={studentData.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 font-bold text-stone-800">
                  <Upload className="w-3.5 h-3.5 text-[#8C1515]" />
                  <span>Click to select photo or drag & drop</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Select your original student photo file (JPG, PNG) to use directly
                </p>
              </div>
            </div>

            {/* URL Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={tempAvatar}
                onChange={(e) => setTempAvatar(e.target.value)}
                placeholder="Or paste image URL (https://...)"
                className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#8C1515]"
              />
            </div>
            {/* Quick avatar selector */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] text-stone-500">Preset:</span>
              <button
                type="button"
                onClick={() => setTempAvatar(studentData.avatarUrl || '')}
                className="px-2 py-0.5 bg-white border border-stone-200 rounded text-[10px] text-stone-700 hover:border-[#8C1515] flex items-center gap-1"
              >
                <span>Michael Hudson Photo</span>
              </button>
            </div>
          </div>

          {/* Campus Photo URL */}
          <div className="space-y-1.5">
            <label className="font-bold text-stone-700 flex items-center justify-between">
              <span>Hoover Tower / Campus Background Banner URL</span>
              <span className="text-[10px] text-stone-400 font-normal">
                (Used on Hub welcome card)
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tempCampus}
                onChange={(e) => setTempCampus(e.target.value)}
                placeholder="https://example.com/hoover-tower.jpg"
                className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#8C1515]"
              />
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-stone-300 shrink-0">
                <img
                  src={tempCampus}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Preset Hotlink Suggestions */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] text-stone-500">Preset:</span>
              <button
                type="button"
                onClick={() => setTempCampus(studentData.campusPhotoUrl || '')}
                className="px-2 py-0.5 bg-white border border-stone-200 rounded text-[10px] text-stone-700 hover:border-[#8C1515] flex items-center gap-1"
              >
                <span>Hoover Tower Campus (Uploaded)</span>
              </button>
            </div>
          </div>

          {/* Preset Hotlink Suggestions */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <span className="font-bold text-stone-800 text-[11px] block">
              Quick Stanford Presets
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  setTempCampus(
                    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80'
                  )
                }
                className="p-2 rounded-lg bg-white border border-stone-200 text-left hover:border-[#8C1515] transition-colors"
              >
                <span className="font-bold block text-[10px] text-stone-900">
                  Hoover Tower & Quad
                </span>
                <span className="text-[9px] text-stone-500">
                  Iconic Stanford aerial
                </span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setTempCampus(
                    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80'
                  )
                }
                className="p-2 rounded-lg bg-white border border-stone-200 text-left hover:border-[#8C1515] transition-colors"
              >
                <span className="font-bold block text-[10px] text-stone-900">
                  Collegiate Archways
                </span>
                <span className="text-[9px] text-stone-500">
                  Main Quad limestone
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <button
            type="button"
            onClick={handleReset}
            className="text-stone-500 hover:text-stone-800 text-xs flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-[#8C1515] hover:bg-[#620000] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              Apply Hotlinks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
