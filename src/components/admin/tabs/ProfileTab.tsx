import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { fileToDataUrl } from '../../../utils/imageUtils';
import { Upload, Plus, Trash2, Check, RefreshCw } from 'lucide-react';

export const ProfileTab: React.FC = () => {
  const { data, updateProfile, showToast } = usePortfolio();
  const [profile, setProfile] = useState({ ...data.profile });
  const [newTitle, setNewTitle] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const dataUrl = await fileToDataUrl(file, 800, 0.85);
      setProfile((prev) => ({ ...prev, profileImage: dataUrl }));
      updateProfile({ profileImage: dataUrl });
      showToast('Profile photo updated successfully!');
    } catch (err) {
      console.error(err);
      showToast('Failed to process image file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profile);
  };

  const addTitle = () => {
    if (!newTitle.trim()) return;
    const updated = [...profile.titles, newTitle.trim()];
    setProfile({ ...profile, titles: updated });
    updateProfile({ titles: updated });
    setNewTitle('');
  };

  const removeTitle = (index: number) => {
    const updated = profile.titles.filter((_, idx) => idx !== index);
    setProfile({ ...profile, titles: updated });
    updateProfile({ titles: updated });
  };

  const addHighlight = () => {
    if (!newHighlight.trim()) return;
    const updated = [...profile.keyExpertise, newHighlight.trim()];
    setProfile({ ...profile, keyExpertise: updated });
    updateProfile({ keyExpertise: updated });
    setNewHighlight('');
  };

  const removeHighlight = (index: number) => {
    const updated = profile.keyExpertise.filter((_, idx) => idx !== index);
    setProfile({ ...profile, keyExpertise: updated });
    updateProfile({ keyExpertise: updated });
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header bar */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Personal & Profile Details</h3>
          <p className="text-xs text-slate-500">Edit your name, headline, contact details, and upload profile photo.</p>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
        >
          <Check size={14} /> Save Profile Changes
        </button>
      </div>

      {/* Profile Photo Uploader */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-28 h-32 rounded-xl overflow-hidden bg-slate-200 border-2 border-indigo-500/50 shadow flex-shrink-0">
          <img
            src={profile.profileImage || '/profile-placeholder.png'}
            alt="Profile Preview"
            className="w-full h-full object-cover object-top"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs">
              <RefreshCw className="animate-spin" size={20} />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Profile Photo
          </label>
          <p className="text-xs text-slate-500">
            Upload your professional photo. JPG, PNG or WebP supported. Saved immediately.
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
            <label className="cursor-pointer px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all">
              <Upload size={13} />
              <span>Upload New Photo</span>
              <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
            </label>
            <button
              type="button"
              onClick={() => {
                setProfile((prev) => ({ ...prev, profileImage: '/profile-placeholder.png' }));
                updateProfile({ profileImage: '/profile-placeholder.png' });
                showToast('Reset photo to default.');
              }}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Reset to Resume Photo
            </button>
          </div>
        </div>
      </div>

      {/* Basic Info Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Hero Tagline
          </label>
          <input
            type="text"
            value={profile.tagline}
            onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Location
          </label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            LinkedIn Profile URL
          </label>
          <input
            type="text"
            value={profile.linkedin}
            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Website URL
          </label>
          <input
            type="text"
            value={profile.website}
            onChange={(e) => setProfile({ ...profile, website: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Resume / CV Link
          </label>
          <input
            type="text"
            value={profile.resumeUrl}
            onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Rotating Titles */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Professional Titles & Badges
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {profile.titles.map((title, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 shadow-sm"
            >
              <span>{title}</span>
              <button
                type="button"
                onClick={() => removeTitle(idx)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add new title (e.g. Erasmus+ Fellow)"
            className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={addTitle}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus size={13} /> Add
          </button>
        </div>
      </div>

      {/* Bio Paragraphs */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Main Biography
          </label>
          <textarea
            rows={4}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Secondary / Operational Bio
          </label>
          <textarea
            rows={3}
            value={profile.subBio || ''}
            onChange={(e) => setProfile({ ...profile, subBio: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          ></textarea>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          About Me Key Competencies
        </label>
        <div className="space-y-2 mb-3">
          {profile.keyExpertise.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 p-2 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 font-medium"
            >
              <span>• {item}</span>
              <button
                type="button"
                onClick={() => removeHighlight(idx)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
            placeholder="Add new competency bullet point..."
            className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={addHighlight}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus size={13} /> Add
          </button>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end pt-4 border-t border-slate-200">
        <button
          type="submit"
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
        >
          <Check size={14} /> Save Profile Changes
        </button>
      </div>
    </form>
  );
};
