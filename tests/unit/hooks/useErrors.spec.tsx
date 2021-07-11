/**

 * @jest-environment jsdom

 */

import { renderHook, act } from "@testing-library/react-hooks"

import { useError } from "../../../utils/hooks/useError"

describe("pruebas en useError", () => {
  const initialForm = {
    name: "sebastian",

    email: "pepe@gmail.com"
  }

  test("debe de mostrar los valores iniciales", () => {
    const { result } = renderHook(() => useError(initialForm))

    const [errors, setErrors, resetErrors] = result.current

    expect(errors).toEqual(initialForm)

    expect(typeof setErrors).toBe("function")

    expect(typeof resetErrors).toBe("function")
  })

  // test("debe de cambiar los valores del formulario (cambiar name)", () => {
  //   const { result } = renderHook(() => useForm(initialForm))

  //   const [, handleInputChange] = result.current

  //   act(() => {
  //     handleInputChange({
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment

  //       // @ts-ignore

  //       target: {
  //         name: "name",

  //         value: "melisa"
  //       }
  //     })
  //   })

  //   const [formValue] = result.current

  //   expect(formValue).toEqual({ ...initialForm, name: "melisa" })
  // })

  test("debe de reestablecer los errores con RESET", () => {
    const { result } = renderHook(() => useError(initialForm))

    const [, setErrors] = result.current

    act(() => {
      setErrors({
        name: "nombre invalido",
        email: "email invalido"
      })
    })

    const [errors] = result.current

    expect(errors).toEqual({
      ...initialForm,
      name: "nombre invalido",
      email: "email invalido"
    })

    const [, , resetErrors] = result.current

    act(() => {
      resetErrors()
    })

    const [errorsReset] = result.current

    expect(errorsReset).toEqual(initialForm)
  })
})
