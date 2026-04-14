import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { useDebounce } from '../hooks/useDebounce'
import ActivityFilter from '../components/features/activities/ActivityFilter'
import ActivityCard from '../components/features/activities/ActivityCard'
import ActivityModal from '../components/features/activities/ActivityModal'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import activitiesData from '../data/activities.json'
import './Activities.css'

export default function Activities() {
  const { state, dispatch } = useApp()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const debouncedSearch = useDebounce(search)

  const filteredActivities = useMemo(() => {
    return activitiesData.filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                            activity.instructor.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesCategory = category === 'All' || activity.category === category
      const matchesDifficulty = difficulty === 'All' || activity.difficulty === difficulty
      
      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [debouncedSearch, category, difficulty])

  const handleEnrol = (id) => {
    const action = state.enrolledActivities.includes(id) ? 'UNENROL_ACTIVITY' : 'ENROL_ACTIVITY'
    dispatch({ type: action, payload: id })
  }

  const handleOpenDetails = (activity) => {
    setSelectedActivity(activity)
    setIsModalOpen(true)
  }

  return (
    <div className="activities-page">
      <header className="activities-header">
        <h1>Wellness Activities</h1>
        <p>Discover yoga, fitness, meditation, and nutrition sessions tailored for you.</p>
      </header>

      <ActivityFilter 
        search={search} 
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />

      <div className="activities-grid fade-in">
        {filteredActivities.map(activity => (
          <ActivityCard 
            key={activity.id}
            activity={activity}
            isEnrolled={state.enrolledActivities.includes(activity.id)}
            onEnrol={handleEnrol}
            onDetails={handleOpenDetails}
          />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <EmptyState 
          message="No activities match your search. Try different filters!" 
          icon="🔍"
          action={<Button variant="secondary" onClick={() => {setSearch(''); setCategory('All'); setDifficulty('All');}}>Reset Filters</Button>}
        />
      )}

      <ActivityModal 
        activity={selectedActivity}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEnrolled={selectedActivity ? state.enrolledActivities.includes(selectedActivity.id) : false}
        onEnrol={handleEnrol}
      />
    </div>
  )
}
