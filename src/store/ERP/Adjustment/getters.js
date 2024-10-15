// NEW
export function get_read_supcus_all (state) {
  return state.read_supcus_all
}

export function get_adj (state) {
  return state.adj
}

export function get_adj_status (state) {
  return state.adj_status
}

export function get_read_adj_by_refno (state) {
  return state.read_adj_by_refno
}

export function get_read_location_list (state) {
  return state.read_location_list
}

export function get_adjchild (state) {
  return state.adjchild
}

export function get_adjchild_status (state) {
  return state.adjchild_status
}

export function get_search_item_for_po (state) {
  return state.search_item_for_po
}

export function get_item_by_itemcode_for_po (state) {
  return state.get_item_by_itemcode_for_po
}

export function get_simain (state) {
  return state.simain
}

export function get_simain_status (state) {
  console.log(state.grmain_status)
  return state.simain_status
}

export function get_read_si_by_refno (state) {
  return state.read_si_by_refno
}

export function get_sichild (state) {
  return state.sichild
}

export function get_sichild_status (state) {
  return state.sichild_status
}

export function get_read_so_list_for_convert_si (state) {
  return state.read_so_list_for_convert_si
}

export function get_simple_receive (state) {
  return state.simple_receive
}

export function get_posting_po (state) {
  return state.posting_po
}

export function get_unposting_po (state) {
  return state.unposting_po
}
