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
            "text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1",
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
