import React from 'react'
import { Link } from 'react-router-dom'
import hero from '../../assets/heroimg.svg'

function Landing() {
  return (
    <div className='bg-[#EBE1D1] min-h-screen font-sans selection:bg-[#E9762B] selection:text-white'>

      <main className='max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between pt-12 lg:pt-24 pb-20 gap-16'>
        
        {/* Left Content */}
        <div className='flex flex-col flex-1 text-center lg:text-left items-center lg:items-start'>
          <h1 className='font-play font-black text-gray-900 leading-[1.1] text-[42px] md:text-[56px] lg:text-[64px] mb-6 max-w-2xl uppercase tracking-tight'>
            Schedule your daily tasks with <span className='text-[#0D4715]'>NVA4GET</span>
          </h1>
          
          <p className='text-gray-700 text-lg mb-10 max-w-lg leading-relaxed'>
            Master your schedule, stay organized, and never miss a beat. The ultimate platform for productivity and seamless task management.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
            <Link to="/login">
              <button className='w-full sm:w-auto bg-[#E9762B] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#E9762B]/30 hover:bg-[#41644A] transition-all transform hover:-translate-y-1 active:scale-95'>
                Login to Dashboard
              </button>
            </Link>
            
            <Link to="/register">
              <button className='w-full sm:w-auto border-2 border-[#E9762B] text-[#E9762B] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#41644A] hover:border-[#41644A] hover:text-white transition-all transform hover:-translate-y-1 active:scale-95'>
                Join Now
              </button>
            </Link>
          </div>

          {/* Trust Element */}
          <div className='mt-12 pt-8 border-t border-black/10 w-full lg:w-3/4'>
            <p className='text-sm uppercase tracking-widest font-bold text-gray-500 mb-4'>Trusted by over 10,000 users</p>
            <div className='flex gap-6 opacity-40 grayscale'>
              {/* You can add small logo icons here later */}
            </div>
          </div>
        </div>

        {/* Right Content (Hero Image) */}
        <div className='flex-1 relative w-full flex justify-center'>
          {/* Subtle Background Accent */}
          <div className='absolute -inset-4 bg-[#E9762B]/10 blur-3xl rounded-full'></div>
          <img 
            src={hero} 
            alt="Task Scheduling Illustration" 
            className='relative w-full max-w-lg drop-shadow-2xl transition-transform duration-700 hover:scale-105' 
          />
        </div>

      </main>
    </div>
  )
}

export default Landing