import { useAtom } from 'jotai';
import Dashboard from './dashboard/Dashboard';
import { userAtom } from '@/atoms';

function Home() {

  return (
    <div>
      {/* <Main /> */}
      <Dashboard />
    </div>
  )
}

export default Home
