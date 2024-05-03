import { Input } from '../../components/Input';
import Avatar from '../../assets/avatar.png'
import { useState } from 'react';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPlusCircle, faMicrophone, faPhone  } from '@fortawesome/free-solid-svg-icons';

export const Dashboard = () => {
    const [message, setMessage] = useState('');
    const contacts = [
        {
            name: 'Nisar',
            status: 'Available',
            img: Avatar
        },
        {
            name: 'Tayyab',
            status: 'Available',
            img: Avatar
        },
        {
            name: 'Ahmad',
            status: 'Available',
            img: Avatar
        },
        {
            name: 'Ahmad',
            status: 'Available',
            img: Avatar
        },{
            name: 'Ahmad',
            status: 'Available',
            img: Avatar
        },{
            name: 'Ahmad',
            status: 'Available',
            img: Avatar
        },{
            name: 'Ahmad',
            status: 'Available',
            img: Avatar
        },{
            name: 'Ahmad',
            status: 'Available',
            img: Avatar
        },{
            name: 'Ahmad',
            status: 'Available',
            img: Avatar
        },
    ]

    return (
        <div className="w-full h-screen flex  ">
            <div className="w-[30%] border h-full bg-Light ">
                <div className="flex  items-center justify-center w-full h-[20%]">
                    <div className="border border-primary rounded-full"> <img src={Avatar} alt="user-avatar" width={75} height={75} /> </div>
                    <div className="flex flex-col ml-3">

                        <div className="text-lg font-medium">User Name</div>
                        <div className="">My Account</div>
                    </div>

                </div>
                <hr className='text-slate-200' />
                <div className="h-[80%] px-10 overflow-y-scroll">
                    <div className="text-primary mt-4 font-semibold text-xl">Chats</div>
                    <div className="">
                        {
                            contacts.map(({ name, img, status }) => (
                                <div className="p-4 my-4 flex items-center hover:bg-slate-200 border-b-2 hover:rounded-lg  cursor-pointer" key={name}>
                                    <div className="border border-primary rounded-full">
                                        <img src={img} alt="user-img" width={60} height={60} />
                                    </div>
                                    <div className="ml-4">
                                        <p className='font-medium'>{name}</p>
                                        <p className='font-mute'>{status}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="w-[70%] border h-full ">
                <div className="py-4 px-6 my-4 h-[10%] flex items-center bg-slate-200 rounded-[3rem]   w-[75%] mx-auto" >
                    <div className="border border-primary rounded-full">
                        <img src={Avatar} alt="user-img" width={60} height={60} />
                    </div>
                    <div className="ml-4 cursor-pointer">
                        <p className='font-medium'>User Name</p>
                        <p className='font-mute'>Online</p>
                    </div>
                        <FontAwesomeIcon icon={faPhone} className='h-5 cursor-pointer ml-auto mr-2' />
                </div> 
                <div className="overflow-y-scroll h-[70%] w-full">
                <div className="px-8 py-4">
                    <div className="bg-slate-300 max-w-[40%] min-h-[80px] rounded-xl rounded-tl-none p-4 my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, laborum!</div>
                    <div className="bg-primary max-w-[40%] ml-auto min-h-[80px] rounded-xl rounded-tr-none p-4 my-3 text-white"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consectetur!</div>
                    <div className="bg-slate-300 max-w-[40%] min-h-[80px] rounded-xl rounded-tl-none p-4 my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, laborum!</div>
                    <div className="bg-primary max-w-[40%] ml-auto min-h-[80px] rounded-xl rounded-tr-none p-4 my-3 text-white"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consectetur!</div>
                    <div className="bg-slate-300 max-w-[40%] min-h-[80px] rounded-xl rounded-tl-none p-4 my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, laborum!</div>
                    <div className="bg-primary max-w-[40%] ml-auto min-h-[80px] rounded-xl rounded-tr-none p-4 my-3 text-white"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consectetur!</div>
                    <div className="bg-slate-300 max-w-[40%] min-h-[80px] rounded-xl rounded-tl-none p-4 my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, laborum!</div>
                    <div className="bg-primary max-w-[40%] ml-auto min-h-[80px] rounded-xl rounded-tr-none p-4 my-3 text-white"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consectetur!</div>
                    <div className="bg-slate-300 max-w-[40%] min-h-[80px] rounded-xl rounded-tl-none p-4 my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, laborum!</div>
                    <div className="bg-primary max-w-[40%] ml-auto min-h-[80px] rounded-xl rounded-tr-none p-4 my-3 text-white"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, consectetur!</div>
                </div>
                </div>
                <div className="p-8 h-[10%]">
                <Input type="text" placeholder='Type a message' className='w-[85%]' value={message} onChange={(e)=>setMessage(e.target.value)} />
                <FontAwesomeIcon icon={faPaperPlane} className='ml-6 h-5 cursor-pointer' />
                <FontAwesomeIcon icon={faPlusCircle}  className='ml-6 h-5 cursor-pointer'/>
                <FontAwesomeIcon icon={faMicrophone}  className='ml-6 h-5 cursor-pointer'/>
                </div>
            </div>
        </div>
    );
}