'use client'
import RickCard from "../components/RickCard";

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

      // height:"100vh"
    }}>
      <RickCard/>
      {/* <button onClick={() => reset()}>Try again</button> */}
    </div>
  )
}