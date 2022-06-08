export const rules = {
    required: (value: string) =>
        (!!value && value != "") || "Required field",
    hasThreeCharacters: (value: string) =>
        (value && value.length == 3) ||
        "Must contain exactly three characters",
    email: (value:string) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        },
}