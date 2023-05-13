'use client';

import GitHub from '@mui/icons-material/GitHub';

import { Generator } from '@/components/generator';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#000]">
      <div className="flex flex-col items-center gap-[30px]">
        <Generator />
        <a href="https://github.com/d9c/passgen" target="_blank">
          <GitHub color="primary" />
        </a>
      </div>
    </div>
  );
}
