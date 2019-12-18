export default{
    Object: (value) => (value || {}),
    Function: (returnValue) => (() => returnValue || {})
}