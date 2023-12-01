import Header from '@/app/components/Header'
import ReportsList from '@/app/components/ReportsList'

function page() {
  return (
    <div className='text-white'>
      <Header title={"Reportes de asistencia"}/>
      <ReportsList />
    </div>
  )
}

export default page