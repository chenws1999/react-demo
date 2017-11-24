const _default = {
    width: 72,
    height: 28,
    color: '#5588ee',
    backgroundColor: '#fff',
    border: 'solid 1px',
    borderRadius: 5,
    style: {margin: '1rem 0.5rem'}
}

export const raisedBtnProps = options => ({
    normal : {..._default, ...options},
    submit : {..._default, color:'#fff', backgroundColor:'#5588ee', ...options},
    cancel : {..._default, color:'#b5b5b5', ...options}
})