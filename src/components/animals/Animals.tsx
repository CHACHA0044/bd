import type { ReactNode } from 'react';

interface AnimalSvgProps {
  children: ReactNode;
  className?: string;
  viewBox?: string;
}

function AnimalSvg({ children, className, viewBox = '0 0 120 120' }: AnimalSvgProps) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const EYE = '#584038';
const BLUSH = '#F2A8B8';

export function Bunny({ className }: { className?: string }) {
  return (
    <AnimalSvg className={className} viewBox="0 0 120 130">
      <g transform="rotate(-9 40 44)">
        <rect x="29" y="5" width="21" height="60" rx="10.5" fill="#FFF4E6" />
        <rect x="34.5" y="14" width="10" height="40" rx="5" fill="#F7C9D4" />
      </g>
      <g transform="rotate(9 80 44)">
        <rect x="70" y="3" width="21" height="62" rx="10.5" fill="#FFF4E6" />
        <rect x="75.5" y="12" width="10" height="42" rx="5" fill="#F7C9D4" />
      </g>
      <ellipse cx="60" cy="98" rx="34" ry="26" fill="#FFF9F0" />
      <ellipse cx="60" cy="100" rx="19" ry="16" fill="#FFFDF8" />
      <ellipse cx="44" cy="109" rx="9" ry="6" fill="#FFF9F0" />
      <ellipse cx="76" cy="109" rx="9" ry="6" fill="#FFF9F0" />
      <circle cx="60" cy="64" r="38" fill="#FFF4E6" />
      <ellipse cx="47" cy="62" rx="3.7" ry="4.7" fill={EYE} />
      <ellipse cx="73" cy="62" rx="3.7" ry="4.7" fill={EYE} />
      <circle cx="48.2" cy="60.4" r="1.2" fill="#fff" />
      <circle cx="74.2" cy="60.4" r="1.2" fill="#fff" />
      <ellipse cx="38" cy="74" rx="7" ry="4.5" fill={BLUSH} opacity=".8" />
      <ellipse cx="82" cy="74" rx="7" ry="4.5" fill={BLUSH} opacity=".8" />
      <path d="M56.5 70.5q3.5-2.3 7 0-1.2 4.6-3.5 5.6-2.3-1-3.5-5.6z" fill="#E796A6" />
      <path
        d="M60 76.5q0 4.2-5 5.3M60 76.5q0 4.2 5 5.3"
        stroke={EYE}
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
      <g transform="translate(84 28)">
        <circle cx="0" cy="-7" r="4.5" fill="#FFFDF8" />
        <circle cx="6.5" cy="-2" r="4.5" fill="#FFFDF8" />
        <circle cx="4" cy="6" r="4.5" fill="#FFFDF8" />
        <circle cx="-4" cy="6" r="4.5" fill="#FFFDF8" />
        <circle cx="-6.5" cy="-2" r="4.5" fill="#FFFDF8" />
        <circle cx="0" cy="0" r="3.6" fill="#FFE69A" />
      </g>
    </AnimalSvg>
  );
}

export function Bear({ className }: { className?: string }) {
  return (
    <AnimalSvg className={className} viewBox="0 0 120 130">
      <circle cx="31" cy="33" r="14" fill="#D2A27E" />
      <circle cx="31" cy="33" r="8" fill="#EFC9AD" />
      <circle cx="89" cy="33" r="14" fill="#D2A27E" />
      <circle cx="89" cy="33" r="8" fill="#EFC9AD" />
      <g transform="rotate(16 60 30)">
        <path d="M60 2 47 36 73 36Z" fill="#FF927E" />
        <path d="M52 25q8 5 16 0" stroke="#FFF8EB" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="60" cy="2" r="5" fill="#FFE69A" />
      </g>
      <ellipse cx="60" cy="100" rx="34" ry="25" fill="#D2A27E" />
      <ellipse cx="60" cy="102" rx="20" ry="15" fill="#E7BE9E" />
      <ellipse cx="43" cy="111" rx="9" ry="6" fill="#C08E6C" />
      <ellipse cx="77" cy="111" rx="9" ry="6" fill="#C08E6C" />
      <circle cx="60" cy="64" r="37" fill="#D2A27E" />
      <ellipse cx="60" cy="75" rx="19" ry="14" fill="#F6E3CE" />
      <ellipse cx="47" cy="61" rx="3.5" ry="4.5" fill={EYE} />
      <ellipse cx="73" cy="61" rx="3.5" ry="4.5" fill={EYE} />
      <circle cx="48.2" cy="59.4" r="1.2" fill="#fff" />
      <circle cx="74.2" cy="59.4" r="1.2" fill="#fff" />
      <ellipse cx="36" cy="72" rx="7" ry="4.3" fill="#E79A8C" opacity=".65" />
      <ellipse cx="84" cy="72" rx="7" ry="4.3" fill="#E79A8C" opacity=".65" />
      <ellipse cx="60" cy="70.5" rx="5" ry="3.6" fill="#5B403A" />
      <path
        d="M60 74v3M60 77q-4.5 4-8 0M60 77q4.5 4 8 0"
        stroke={EYE}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </AnimalSvg>
  );
}

export function Elephant({ className }: { className?: string }) {
  return (
    <AnimalSvg className={className} viewBox="0 0 120 125">
      <ellipse cx="26" cy="66" rx="19" ry="26" fill="#A9C9DC" transform="rotate(-12 26 66)" />
      <ellipse cx="94" cy="66" rx="19" ry="26" fill="#A9C9DC" transform="rotate(12 94 66)" />
      <ellipse cx="29" cy="67" rx="11" ry="17" fill="#D7E9F4" transform="rotate(-12 29 67)" />
      <ellipse cx="91" cy="67" rx="11" ry="17" fill="#D7E9F4" transform="rotate(12 91 67)" />
      <ellipse cx="60" cy="101" rx="37" ry="23" fill="#BFD9E8" />
      <ellipse cx="44" cy="111" rx="10" ry="6.5" fill="#A9C9DC" />
      <ellipse cx="76" cy="111" rx="10" ry="6.5" fill="#A9C9DC" />
      <circle cx="60" cy="62" r="33" fill="#BFD9E8" />
      <path
        d="M55 79c1 15-1 22-8 25-6 2-10-2-7-7"
        stroke="#BFD9E8"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M55 82c1 11-1 17-6 19"
        stroke="#A9C9DC"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity=".7"
      />
      <path d="M72 83l4 8-8-1z" fill="#FFFDF8" />
      <path d="M48 84l-3 7 7-1z" fill="#FFFDF8" />
      <ellipse cx="47" cy="59" rx="3.5" ry="4.4" fill={EYE} />
      <ellipse cx="73" cy="59" rx="3.5" ry="4.4" fill={EYE} />
      <circle cx="48.2" cy="57.5" r="1.2" fill="#fff" />
      <circle cx="74.2" cy="57.5" r="1.2" fill="#fff" />
      <ellipse cx="36" cy="70" rx="7" ry="4.2" fill={BLUSH} opacity=".8" />
      <ellipse cx="84" cy="70" rx="7" ry="4.2" fill={BLUSH} opacity=".8" />
      <path
        d="M51 74q9 6 18 0"
        stroke={EYE}
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
    </AnimalSvg>
  );
}

export function Lion({ className }: { className?: string }) {
  const mane = Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2;
    return {
      x: 60 + Math.cos(angle) * 38,
      y: 62 + Math.sin(angle) * 38,
      key: index,
    };
  });

  return (
    <AnimalSvg className={className} viewBox="0 0 120 130">
      <ellipse cx="60" cy="101" rx="33" ry="24" fill="#F2B25C" />
      <ellipse cx="60" cy="103" rx="18" ry="14" fill="#FFD98A" />
      <ellipse cx="44" cy="112" rx="9" ry="6" fill="#EAA146" />
      <ellipse cx="76" cy="112" rx="9" ry="6" fill="#EAA146" />
      {mane.map(({ x, y, key }) => (
        <circle key={key} cx={x} cy={y} r="16" fill="#F2B25C" />
      ))}
      <circle cx="60" cy="62" r="32" fill="#FFD98A" />
      <path d="M51 34q9-12 18 0" stroke="#F2B25C" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="72" rx="17" ry="13" fill="#FFF0C9" />
      <ellipse cx="47" cy="59" rx="3.6" ry="4.6" fill={EYE} />
      <ellipse cx="73" cy="59" rx="3.6" ry="4.6" fill={EYE} />
      <circle cx="48.2" cy="57.4" r="1.2" fill="#fff" />
      <circle cx="74.2" cy="57.4" r="1.2" fill="#fff" />
      <ellipse cx="36" cy="70" rx="6.5" ry="4" fill={BLUSH} opacity=".65" />
      <ellipse cx="84" cy="70" rx="6.5" ry="4" fill={BLUSH} opacity=".65" />
      <path d="M56 68q4-3 8 0-1 4-4 5-3-1-4-5z" fill="#B9704F" />
      <path
        d="M60 73v3M60 76q-4 3.5-7 0M60 76q4 3.5 7 0"
        stroke={EYE}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M43 72l-9-3M43 76l-9 2M77 72l9-3M77 76l9 2"
        stroke="#B9704F"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity=".7"
      />
    </AnimalSvg>
  );
}

export function Giraffe({ className }: { className?: string }) {
  return (
    <AnimalSvg className={className} viewBox="0 0 120 170">
      <path d="M51 58q-7 48-5 108h28q2-58 9-108z" fill="#FFD98A" />
      <ellipse cx="60" cy="44" rx="29" ry="25" fill="#FFD98A" />
      <path d="M52 20v-9" stroke="#E7B45A" strokeWidth="5" strokeLinecap="round" />
      <path d="M68 20v-9" stroke="#E7B45A" strokeWidth="5" strokeLinecap="round" />
      <circle cx="52" cy="9" r="5" fill="#F2B25C" />
      <circle cx="68" cy="9" r="5" fill="#F2B25C" />
      <ellipse cx="31" cy="36" rx="11" ry="6" fill="#FFD98A" transform="rotate(-28 31 36)" />
      <ellipse cx="89" cy="36" rx="11" ry="6" fill="#FFD98A" transform="rotate(28 89 36)" />
      <ellipse cx="31" cy="36" rx="6" ry="3" fill="#F7C9D4" transform="rotate(-28 31 36)" />
      <ellipse cx="89" cy="36" rx="6" ry="3" fill="#F7C9D4" transform="rotate(28 89 36)" />
      <ellipse cx="60" cy="56" rx="19" ry="13" fill="#FFF0C9" />
      <ellipse cx="49" cy="40" rx="3.4" ry="4.3" fill={EYE} />
      <ellipse cx="71" cy="40" rx="3.4" ry="4.3" fill={EYE} />
      <circle cx="50.1" cy="38.5" r="1.1" fill="#fff" />
      <circle cx="72.1" cy="38.5" r="1.1" fill="#fff" />
      <ellipse cx="39" cy="51" rx="6" ry="3.6" fill={BLUSH} opacity=".75" />
      <ellipse cx="81" cy="51" rx="6" ry="3.6" fill={BLUSH} opacity=".75" />
      <path d="M56 55q4-3 8 0-1 3.5-4 4.5-3-1-4-4.5z" fill="#C9854C" />
      <path
        d="M60 60v2.5M60 62.5q-3.5 3-6 0M60 62.5q3.5 3 6 0"
        stroke={EYE}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <g fill="#F2B25C" opacity=".85">
        <circle cx="50" cy="54" r="4" />
        <circle cx="73" cy="52" r="3.2" />
        <circle cx="47" cy="86" r="5" />
        <circle cx="72" cy="98" r="6" />
        <circle cx="53" cy="118" r="5" />
        <circle cx="71" cy="136" r="6" />
        <circle cx="56" cy="151" r="4.5" />
      </g>
    </AnimalSvg>
  );
}

export function Monkey({ className }: { className?: string }) {
  return (
    <AnimalSvg className={className} viewBox="0 0 120 150">
      <path
        d="M66 34c2-20 9-27 17-28"
        stroke="#B98767"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="66" r="15" fill="#B98767" />
      <circle cx="20" cy="66" r="9" fill="#E9B9A5" />
      <circle cx="88" cy="66" r="15" fill="#B98767" />
      <circle cx="88" cy="66" r="9" fill="#E9B9A5" />
      <ellipse cx="54" cy="112" rx="31" ry="30" fill="#B98767" />
      <ellipse cx="54" cy="116" rx="19" ry="21" fill="#E9B9A5" />
      <circle cx="54" cy="70" r="34" fill="#B98767" />
      <path
        d="M54 39c-25 0-27 30-16 43 6 7 26 7 32 0 11-13 9-43-16-43z"
        fill="#F6DCC5"
      />
      <ellipse cx="43" cy="64" rx="3.5" ry="4.5" fill={EYE} />
      <ellipse cx="65" cy="64" rx="3.5" ry="4.5" fill={EYE} />
      <circle cx="44.2" cy="62.4" r="1.2" fill="#fff" />
      <circle cx="66.2" cy="62.4" r="1.2" fill="#fff" />
      <ellipse cx="33" cy="75" rx="6.5" ry="4" fill={BLUSH} opacity=".65" />
      <ellipse cx="75" cy="75" rx="6.5" ry="4" fill={BLUSH} opacity=".65" />
      <ellipse cx="54" cy="73" rx="3.2" ry="2.4" fill="#6C4A3E" />
      <path
        d="M54 76v2M54 78q-4.5 4.5-8 0.5M54 78q4.5 4.5 8 0.5"
        stroke={EYE}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="38" cy="139" rx="9" ry="5" fill="#A97455" />
      <ellipse cx="70" cy="139" rx="9" ry="5" fill="#A97455" />
    </AnimalSvg>
  );
}

export function LittleBird({ className }: { className?: string }) {
  return (
    <AnimalSvg className={className} viewBox="0 0 120 120">
      <path d="M74 78l22 10-18 4z" fill="#7BC99B" />
      <ellipse cx="58" cy="78" rx="28" ry="23" fill="#9FD8B6" />
      <ellipse cx="54" cy="86" rx="17" ry="12" fill="#D7F3E1" />
      <circle cx="58" cy="48" r="24" fill="#9FD8B6" />
      <path d="M40 56q-14 1-17 10 11 5 21-2z" fill="#7BC99B" />
      <path d="M80 48l13 5-13 6z" fill="#F2A64E" />
      <ellipse cx="52" cy="45" rx="3.2" ry="4.1" fill={EYE} />
      <circle cx="53.2" cy="43.5" r="1.1" fill="#fff" />
      <ellipse cx="43" cy="54" rx="5.5" ry="3.4" fill={BLUSH} opacity=".8" />
      <path d="M53 88v14M63 88v14" stroke="#E7B45A" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M49 102h8M59 102h8" stroke="#E7B45A" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M58 26q4-10 12-10" stroke="#7BC99B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </AnimalSvg>
  );
}

export function Butterfly({ className }: { className?: string }) {
  return (
    <AnimalSvg className={className} viewBox="0 0 120 120">
      <g transform="rotate(-18 35 46)">
        <ellipse cx="30" cy="44" rx="22" ry="18" fill="#DDD0FF" />
        <ellipse cx="42" cy="72" rx="15" ry="13" fill="#F7C9D4" />
        <circle cx="26" cy="43" r="5" fill="#FFF8EB" opacity=".7" />
      </g>
      <g transform="rotate(18 85 46)">
        <ellipse cx="90" cy="44" rx="22" ry="18" fill="#DDD0FF" />
        <ellipse cx="78" cy="72" rx="15" ry="13" fill="#F7C9D4" />
        <circle cx="94" cy="43" r="5" fill="#FFF8EB" opacity=".7" />
      </g>
      <ellipse cx="60" cy="66" rx="5" ry="24" fill="#8A6F62" />
      <circle cx="60" cy="40" r="7" fill="#8A6F62" />
      <path d="M57 34q-8-14-15-16M63 34q8-14 15-16" stroke="#8A6F62" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="42" cy="18" r="2.5" fill="#8A6F62" />
      <circle cx="78" cy="18" r="2.5" fill="#8A6F62" />
      <circle cx="60" cy="39" r="2" fill="#FFF8EB" opacity=".8" />
    </AnimalSvg>
  );
}
