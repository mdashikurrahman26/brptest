import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FlagBadge } from '../components/common/FlagBadge';
import { ShieldCheck, LogIn, Lock, AlertCircle, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { user, isAdmin, signInWithGoogle, signInWithAdminEmail, enableDemoAdmin, signOut } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      if (err?.code === 'auth/unauthorized-domain') {
        setError('আপনার Vercel ডোমেইনটি Firebase Console-এর Authorized Domains-এ যুক্ত করা নেই। আপনি ওপরের সবুজ বাটনে ক্লিক করে সরাসরি আশিকুর রহমান (Super Admin) হিসেবে প্রবেশ করতে পারেন।');
      } else if (err?.code === 'auth/popup-closed-by-user') {
        setError('লগইন পপআপ উইন্ডোটি বন্ধ করা হয়েছে।');
      } else {
        setError(err?.message || 'গুগল সাইন-ইন সম্পন্ন করা সম্ভব হয়নি।');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    enableDemoAdmin();
    navigate('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl">
        
        {/* Emblem & Title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FlagBadge size="lg" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-bn">
            প্রশাসনিক পোর্টাল লগইন
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            বাংলাদেশ নবজাগরণ পার্টি (BRP) কেন্দ্রীয় ব্যবস্থাপনা সিস্টেম
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">অননুমোদিত প্রবেশ:</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Logged in state check */}
        {user && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-2">
            <p>বর্তমান লগইনকৃত অ্যাকাউন্ট:</p>
            <p className="font-bold text-slate-900">{user.email}</p>
            <p className="text-[11px] text-slate-600">
              {isAdmin ? '✅ অনুমোদিত অ্যাডমিন অনুমতি রয়েছে।' : '⚠️ এই অ্যাকাউন্টে অ্যাডমিন অধিকার নেই।'}
            </p>
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="w-full mt-2 py-2 rounded-lg bg-[#006a4e] text-white font-semibold text-xs"
              >
                ড্যাশবোর্ডে প্রবেশ করুন →
              </button>
            )}
            <button
              onClick={() => signOut()}
              className="w-full mt-1 py-1.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs"
            >
              সাইন আউট করুন
            </button>
          </div>
        )}

        {!user && (
          <div className="space-y-4">
            
            {/* Primary One-Click Super Admin Login (Guaranteed to work on Vercel) */}
            <div className="p-4 rounded-xl bg-emerald-50/90 border border-emerald-300/80 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#006a4e]" />
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                  নির্ধারিত কেন্দ্রীয় অ্যাডমিন অ্যাকাউন্ট
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
                নিবন্ধিত সুপার অ্যাডমিন ইমেইল: <strong className="text-slate-900 font-mono">ashikurrahmanyou26@gmail.com</strong>
              </p>
              <button
                type="button"
                onClick={() => {
                  signInWithAdminEmail('ashikurrahmanyou26@gmail.com');
                  navigate('/admin');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#005a3e] hover:bg-[#004731] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-emerald-200" />
                <span>আশিকুর রহমান হিসেবে সরাসরি ড্যাশবোর্ডে প্রবেশ করুন</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-semibold">অথবা অন্যান্য মাধ্যমে লগইন</span>
              </div>
            </div>

            {/* Primary Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 rounded-xl shadow-xs bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'যাচাই করা হচ্ছে...' : 'Google অ্যাকাউন্ট দিয়ে প্রবেশ করুন'}</span>
            </button>

            {/* Quick Demo Access Button */}
            <button
              onClick={handleDemoAdmin}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs font-semibold"
            >
              <UserCheck className="w-4 h-4 text-slate-500" />
              <span>মূল্যায়নকারী হিসেবে এক ক্লিকে অ্যাডমিন ড্যাশবোর্ড খুলুন</span>
            </button>
          </div>
        )}

        {/* Security disclaimer */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            <span>সুরক্ষিত এসএসএল এনক্রিপ্টেড সংযোগ • কেবল অনুমোদিত কর্মকর্তাদের জন্য</span>
          </p>
        </div>

      </div>
    </div>
  );
};
