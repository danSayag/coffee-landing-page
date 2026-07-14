import { memo } from 'react'
import brownBeanImg from '../../assets/beans/brown coffee bean.webp'

interface CoffeeBeanProps {
  className?: string
}

const CoffeeBean = memo(function CoffeeBean({ className }: CoffeeBeanProps) {
  return <img src={brownBeanImg} alt="" className={className} aria-hidden="true" draggable={false} />
})

export default CoffeeBean
