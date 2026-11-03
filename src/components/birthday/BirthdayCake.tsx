export default function BirthdayCake() {
  return (
    <svg
      viewBox="0 0 220 245"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className="birthday-cake"
    >
      <defs>
        <linearGradient id="cake-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFDDE6" />
          <stop offset="100%" stopColor="#F4B8C9" />
        </linearGradient>
        <linearGradient id="cake-yellow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF0B8" />
          <stop offset="100%" stopColor="#FFDD7A" />
        </linearGradient>
        <linearGradient id="cake-cream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF8" />
          <stop offset="100%" stopColor="#FFEFD6" />
        </linearGradient>
        <linearGradient id="flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#FF927E" />
          <stop offset="55%" stopColor="#FFC15E" />
          <stop offset="100%" stopColor="#FFE69A" />
        </linearGradient>
      </defs>

      <ellipse cx="110" cy="232" rx="78" ry="9" fill="#E9D4BE" opacity=".55" />
      <ellipse cx="110" cy="224" rx="75" ry="10" fill="#EBD3B9" />
      <ellipse cx="110" cy="219" rx="75" ry="10" fill="#FFFDF8" />
      <ellipse cx="110" cy="217" rx="62" ry="7" fill="#F8E6D2" opacity=".8" />

      {/* bottom tier */}
      <rect x="37" y="157" width="146" height="60" rx="20" fill="url(#cake-pink)" />
      <path
        d="M37 164q10 0 10 10t10 10 10-10 10-10 10 10 10 10 10-10 10-10 10 10 10 10 10-10 10-10 10 10 10 10 10-10 10-10 10 10 10 10 6-4v30H37z"
        fill="url(#cake-cream)"
        opacity=".95"
      />
      <circle cx="110" cy="190" r="16" fill="#FFF8EB" />
      <circle cx="110" cy="190" r="16" fill="none" stroke="#F7C9D4" strokeWidth="2" />
      <text
        x="110"
        y="198"
        textAnchor="middle"
        fontFamily="'Fredoka Variable', Fredoka, sans-serif"
        fontSize="23"
        fontWeight="700"
        fill="#DE5C46"
      >
        3
      </text>

      {/* middle tier */}
      <rect x="51" y="113" width="118" height="48" rx="17" fill="url(#cake-yellow)" />
      <path
        d="M51 119q8 0 8 8t8 8 8-8 8-8 8 8 8 8 8-8 8-8 8 8 8 8 8-8 8-8 8 8 8 8 8-8 8-8 8 8 8 8 5-3v22H51z"
        fill="url(#cake-cream)"
        opacity=".95"
      />

      {/* top tier */}
      <rect x="65" y="77" width="90" height="40" rx="15" fill="url(#cake-cream)" />
      <path
        d="M65 82q7 0 7 7t7 7 7-7 7-7 7 7 7 7 7-7 7-7 7 7 7 7 7-7 7-7 7 7 7 7 7-7 7-7 7 7 7 7 6-3v14H65z"
        fill="#FFF8EB"
      />

      {/* sprinkles */}
      <g strokeLinecap="round" strokeWidth="4">
        <path d="M62 141l7 4" stroke="#C8E7FA" />
        <path d="M88 146l7-4" stroke="#CDECCF" />
        <path d="M116 141l7 4" stroke="#DDD0FF" />
        <path d="M142 147l7-4" stroke="#FF927E" />
        <path d="M154 132l6 4" stroke="#CDECCF" />
        <path d="M64 129l6 3" stroke="#FFE69A" />
        <path d="M52 186l7 4" stroke="#C8E7FA" />
        <path d="M85 192l7-4" stroke="#CDECCF" />
        <path d="M131 190l7 4" stroke="#DDD0FF" />
        <path d="M160 185l7-4" stroke="#FFF8EB" />
        <path d="M150 174l6 3" stroke="#CDECCF" />
        <path d="M62 174l6-3" stroke="#FFE69A" />
        <path d="M86 99l6 3" stroke="#FF927E" />
        <path d="M126 101l6-3" stroke="#C8E7FA" />
      </g>

      {/* little hearts on the cake */}
      <g fill="#FF927E" opacity=".8">
        <path d="M74 162c-3-3-8 0-5 4l5 5 5-5c3-4-2-7-5-4z" />
        <path d="M146 118c-3-3-8 0-5 4l5 5 5-5c3-4-2-7-5-4z" />
      </g>

      {/* candles */}
      {[
        { x: 88, color: '#F7A8BC', stripe: '#FFF8EB' },
        { x: 110, color: '#A8DDB2', stripe: '#FFF8EB' },
        { x: 132, color: '#C7B5F5', stripe: '#FFF8EB' },
      ].map((candle, index) => (
        <g key={candle.x}>
          <rect x={candle.x - 5} y="49" width="10" height="34" rx="5" fill={candle.color} />
          <path
            d={`M${candle.x - 5} 57l10-5M${candle.x - 5} 69l10-5M${candle.x - 5} 81l10-5`}
            stroke={candle.stripe}
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity=".85"
          />
          <path d={`M${candle.x} 49v-4`} stroke="#7A5B4C" strokeWidth="2" strokeLinecap="round" />
          <g
            className="cake-flame"
            style={{
              transformOrigin: `${candle.x}px 38px`,
              animationDelay: `${index * 0.18}s`,
            }}
          >
            <path
              d={`M${candle.x} 41c-6-7-3-14 0-17 3 3 6 10 0 17z`}
              fill="url(#flame)"
            />
            <path
              d={`M${candle.x} 40c-2.6-3.5-1.4-7 0-8.6 1.4 1.6 2.6 5.1 0 8.6z`}
              fill="#FFF8EB"
              opacity=".9"
            />
          </g>
        </g>
      ))}

      {/* base flowers */}
      <g>
        <circle cx="53" cy="215" r="4" fill="#FFE69A" />
        <circle cx="53" cy="209" r="3" fill="#FFFDF8" />
        <circle cx="47" cy="214" r="3" fill="#FFFDF8" />
        <circle cx="59" cy="214" r="3" fill="#FFFDF8" />
        <circle cx="49" cy="219" r="3" fill="#FFFDF8" />
        <circle cx="57" cy="219" r="3" fill="#FFFDF8" />
        <circle cx="167" cy="214" r="4" fill="#FFE69A" />
        <circle cx="167" cy="208" r="3" fill="#FFFDF8" />
        <circle cx="161" cy="213" r="3" fill="#FFFDF8" />
        <circle cx="173" cy="213" r="3" fill="#FFFDF8" />
        <circle cx="163" cy="218" r="3" fill="#FFFDF8" />
        <circle cx="171" cy="218" r="3" fill="#FFFDF8" />
      </g>
    </svg>
  );
}
