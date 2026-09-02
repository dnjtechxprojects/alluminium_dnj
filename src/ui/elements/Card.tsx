import React,{ReactNode} from 'react'


type CardProps = {
  children: ReactNode;
  className?:string;
};


const Card = ({children,className}:CardProps) => {
  return (
    <div className={`${className} shadow-md bg-white p-6 rounded-2xl`}>
        {children}
    </div>
  )
}

export default Card