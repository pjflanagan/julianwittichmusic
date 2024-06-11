import { ReactNode } from "react"
import Style from './style.module.scss';

type SectionProps = {
  children: ReactNode;
  id?: string;
}

export function Section({ children, id }: SectionProps) {
  return (
    <div className={Style["section"]} id={id}>
      {children}
    </div>
  )
}