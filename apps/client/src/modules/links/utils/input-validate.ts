export const updateInputBorder = (
  inputRef: React.RefObject<HTMLInputElement>,
  regex: RegExp
) => {
  const value = inputRef.current?.value ?? ''

  if (value === '') {
    inputRef.current?.classList.replace('border-[#d3102f]', 'border-slate-300')
    return
  }

  const isValid = regex.test(value)

  if (isValid) {
    inputRef.current?.classList.replace('border-[#d3102f]', 'border-slate-300')
  } else {
    inputRef.current?.classList.replace('border-slate-300', 'border-[#d3102f]')
  }
}
