import {atom} from "recoil"

export const authState = atom({
  key:"authState",
  default:false
})

export const searchState = atom({
  key:"searchState",
  default:""
})

export const cartState = atom({
  key:"cartState",
  default: []
})