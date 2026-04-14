import './Card.css'

export default function Card({ 
  children, 
  title, 
  headerAction, 
  footer, 
  image, 
  imageAlt,
  hoverable = true, 
  className = '',
  ...rest 
}) {
  return (
    <div 
      className={`card ${hoverable ? 'card-hover' : ''} ${className}`} 
      {...rest}
    >
      {image && (
        <div className="card-img-container">
          <img src={image} alt={imageAlt || title} className="card-img" />
        </div>
      )}
      
      {(title || headerAction) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {headerAction && <div className="card-header-action">{headerAction}</div>}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  )
}
