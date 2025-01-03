export const update_invoice = (state, payload) => {
  state.invoice = payload
}

export const update_invoice_child = (state, payload) => {
  state.invoice_child = payload
}

export const update_cndn_note = (state, payload) => {
  state.cndn_note = payload
}

export const update_cndn_child_note = (state, payload) => {
  state.cndn_child_note = payload
}
