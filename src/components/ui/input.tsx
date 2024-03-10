import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, labelProps, ...props }, ref) => {
    return (
      <>
        {
          label && <Label htmlFor={label} {...labelProps}>{label}</Label>
        }
        <input
          type={type}
          className={cn(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 mt-2",
            error ? 'bg-[#F4D6D2]' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-500 text-xs my-2">{error}</p>}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
