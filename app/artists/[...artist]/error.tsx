'use client'
import RickCard from "@/app/ui/RickCard"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="background-gradient" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white'
    }}>
      <RickCard />
    </div>
  )
}