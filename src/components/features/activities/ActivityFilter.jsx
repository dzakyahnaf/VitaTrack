import './ActivityFilter.css'

export default function ActivityFilter({ 
  search, 
  onSearchChange, 
  category, 
  onCategoryChange, 
  difficulty, 
  onDifficultyChange 
}) {
  const categories = ['All', 'Yoga', 'Fitness', 'Meditation', 'Nutrition', 'Sleep']
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  return (
    <div className="filters-container fade-in">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input 
          type="text" 
          placeholder="Search activities..." 
          className="search-input"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-groups">
        <div className="filter-group">
          <span className="filter-label">Category</span>
          <div className="pill-group">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`pill ${category === cat ? 'active' : ''}`}
                onClick={() => onCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Difficulty</span>
          <select 
            className="filter-select" 
            value={difficulty} 
            onChange={(e) => onDifficultyChange(e.target.value)}
          >
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
