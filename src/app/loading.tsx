export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 py-32">
      <div
        className="w-40 h-[2px] rounded-full overflow-hidden"
        style={{ backgroundColor: 'color-mix(in srgb, var(--on-surface-mute) 20%, transparent)' }}
      >
        <div
          className="h-full rounded-full animate-pulse"
          style={{ backgroundColor: 'var(--accent)', width: '60%' }}
        />
      </div>
    </div>
  )
}
