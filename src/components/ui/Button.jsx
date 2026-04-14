import './Button.css'
import Spinner from './Spinner'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled, 
  loading, 
  onClick, 
  className = '',
  type = 'button',
  ...rest 
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      {...rest}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  )
}
