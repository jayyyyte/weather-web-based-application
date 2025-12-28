import { Loader } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <Loader className="w-12 h-12 text-white animate-spin" />
    </div>
  );
}