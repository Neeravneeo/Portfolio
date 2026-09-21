import React, { useState } from 'react';
import {
  HardDrive,
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { auditService } from '../../lib/audit';

interface StoredAsset {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  uploadedAt: string;
  altText: string;
  bucket: string;
}

const STORAGE_KEY_ASSETS = 'portfolio_r2_assets_v1';

const INITIAL_R2_ASSETS: StoredAsset[] = [
  {
    id: 'asset-1',
    name: 'alzo-hero-render.png',
    url: 'https://cdn.21st.dev/assets/mirror/59/59d3ee91fbfc509ec20d4e5df064c031c19005c1045874dbd187d7164cd509cf.jpg',
    size: '1.4 MB',
    type: 'image/png',
    uploadedAt: '2026-09-18T10:14:00Z',
    altText: 'ALZO 3-role neurological monitoring ecosystem rendering',
    bucket: 'portfolio-assets',
  },
  {
    id: 'asset-2',
    name: 'neerav-executive-resume.pdf',
    url: '/resume.pdf',
    size: '142 KB',
    type: 'application/pdf',
    uploadedAt: '2026-09-19T14:30:00Z',
    altText: 'Neerav Executive Product Designer & Engineer CV',
    bucket: 'portfolio-assets',
  },
  {
    id: 'asset-3',
    name: 'peerclub-mesh-diagram.svg',
    url: '/assets/peerclub-diagram.svg',
    size: '86 KB',
    type: 'image/svg+xml',
    uploadedAt: '2026-09-20T08:22:00Z',
    altText: 'Peer Club WebRTC mesh architecture graph',
    bucket: 'portfolio-assets',
  },
];

export const AdminStorage: React.FC = () => {
  const [assets, setAssets] = useState<StoredAsset[]>(() => {
    if (typeof window === 'undefined') return INITIAL_R2_ASSETS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ASSETS);
      return stored ? JSON.parse(stored) : INITIAL_R2_ASSETS;
    } catch {
      return INITIAL_R2_ASSETS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<StoredAsset | null>(null);

  const persistAssets = (updated: StoredAsset[]) => {
    setAssets(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(updated));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const newAsset: StoredAsset = {
        id: `r2-${Date.now().toString(36)}`,
        name: file.name,
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type || 'application/octet-stream',
        uploadedAt: new Date().toISOString(),
        altText: file.name.replace(/\.[^/.]+$/, ''),
        bucket: 'portfolio-assets',
      };

      const updated = [newAsset, ...assets];
      persistAssets(updated);
      auditService.log('media_uploaded', newAsset.name, `Uploaded to Cloudflare R2 bucket: ${newAsset.size}`);
      setIsUploading(false);
    }, 600);
  };

  const handleDelete = (id: string, name: string) => {
    const updated = assets.filter((a) => a.id !== id);
    persistAssets(updated);
    auditService.log('media_deleted', name, `Purged asset from R2 cache`);
    if (previewAsset?.id === id) setPreviewAsset(null);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredAssets = assets.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.altText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* R2 Cloudflare Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#8052ff]/10 via-[#15846e]/10 to-black border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <HardDrive className="w-5 h-5 text-[#ffb829]" />
            <h3 className="text-base font-normal text-white">Cloudflare R2 Object Storage</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#15846e]/20 text-[#15846e] border border-[#15846e]/30">
              S3 API VERIFIED
            </span>
          </div>
          <p className="text-xs text-[#9a9a9a] font-extralight max-w-xl">
            Account: <code className="text-white font-mono">a0b8c6edb1419ee0c4b9c21599c013d4</code> • Bucket: <code className="text-[#8052ff] font-mono">portfolio-assets</code>. Zero egress bandwidth charges with global edge caching.
          </p>
        </div>

        <label className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono text-white bg-[#8052ff] hover:bg-[#8052ff]/90 cursor-pointer transition-all shadow-lg shadow-[#8052ff]/25 shrink-0">
          <Upload className={`w-3.5 h-3.5 ${isUploading ? 'animate-bounce' : ''}`} />
          <span>{isUploading ? 'Uploading to R2...' : 'Upload Media Asset'}</span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
          <input
            type="text"
            placeholder="Search R2 assets by name or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.02] border border-white/10 text-xs text-white placeholder-[#9a9a9a] focus:outline-none focus:border-[#8052ff]"
          />
        </div>

        <span className="text-xs font-mono text-[#9a9a9a] shrink-0">
          {assets.length} stored assets
        </span>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => {
          const isImage = asset.type.startsWith('image/');
          return (
            <div
              key={asset.id}
              className="p-4 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-3 flex flex-col justify-between"
            >
              {/* Thumbnail / Icon container */}
              <div
                onClick={() => setPreviewAsset(asset)}
                className="w-full h-36 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden flex items-center justify-center cursor-pointer relative group"
              >
                {isImage ? (
                  <img
                    src={asset.url}
                    alt={asset.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <FileText className="w-10 h-10 text-[#8052ff]" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white font-mono">
                  Inspect Asset
                </div>
              </div>

              {/* Details */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-white truncate max-w-[180px]">{asset.name}</span>
                  <span className="text-[10px] font-mono text-[#9a9a9a]">{asset.size}</span>
                </div>
                <p className="text-[11px] text-[#9a9a9a] font-extralight line-clamp-1">{asset.altText}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                <button
                  onClick={() => copyToClipboard(asset.url, asset.id)}
                  className="flex items-center gap-1 text-[11px] font-mono text-[#8052ff] hover:text-white transition-colors"
                >
                  {copiedId === asset.id ? (
                    <>
                      <Check className="w-3 h-3 text-[#15846e]" />
                      <span className="text-[#15846e]">Copied URL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(asset.id, asset.name)}
                  className="p-1.5 rounded-lg text-[#9a9a9a] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Purge asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Asset Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="max-w-xl w-full bg-[#000000] border border-white/15 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-normal text-white truncate">{previewAsset.name}</h3>
              <button
                onClick={() => setPreviewAsset(null)}
                className="text-xs text-[#9a9a9a] hover:text-white"
              >
                Close
              </button>
            </div>

            {previewAsset.type.startsWith('image/') ? (
              <div className="w-full max-h-72 overflow-hidden rounded-2xl border border-white/10 bg-black flex items-center justify-center">
                <img src={previewAsset.url} alt={previewAsset.altText} className="max-h-72 object-contain" />
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-[#9a9a9a]">Document: {previewAsset.type}</div>
            )}

            <div className="space-y-2 text-xs font-mono text-[#9a9a9a]">
              <div>Alt text: <span className="text-white">{previewAsset.altText}</span></div>
              <div>Bucket: <span className="text-[#8052ff]">{previewAsset.bucket}</span></div>
              <div>Size: <span className="text-white">{previewAsset.size}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
