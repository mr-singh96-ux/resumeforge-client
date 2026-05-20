import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User, Download, Eye, EyeOff } from 'lucide-react'

import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'

import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {

  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#16a34a", // ✅ green default
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    loadExistingResume()
  }, [])

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, {
        headers: { Authorization: token }
      })
      if (data.resume) {
        setResumeData(data.resume)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const saveResume = async () => {
    try {
      const { data } = await api.put('/api/resumes/update', {
        resumeId,
        resumeData
      }, {
        headers: { Authorization: token }
      })

      setResumeData(data.resume)
      toast.success("Saved successfully")
    } catch (error) {
      console.error(error)
    }
  }

  const downloadResume = () => {
    window.print()
  }

  const toggleVisibility = () => {
    setResumeData(prev => ({ ...prev, public: !prev.public }))
  }

  return (
    <div className="bg-green-50 min-h-screen">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">

        <Link to={'/app'} className='flex gap-2 items-center text-green-700 font-medium'>
          <ArrowLeftIcon className="size-4" /> Back
        </Link>

        <div className="flex gap-3">

          {/* PRIVATE */}
          <button
            onClick={toggleVisibility}
            className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded"
          >
            {resumeData.public ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
            {resumeData.public ? "Public" : "Private"}
          </button>

          {/* DOWNLOAD */}
          <button
            onClick={downloadResume}
            className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded"
          >
            <Download className="size-4" />
            Download
          </button>

        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>

          {/* LEFT PANEL */}
          <div className='lg:col-span-5'>
            <div className='bg-white p-6 rounded-lg border border-green-200 shadow-sm'>

              {/* NAV */}
              <div className="flex items-center justify-between mb-4">

                <div className="flex gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) => setResumeData(prev => ({ ...prev, template }))}
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))}
                  />
                </div>

                <div className="flex items-center gap-3 text-sm text-green-700">
                  <button
                    disabled={activeSectionIndex === 0}
                    onClick={() => setActiveSectionIndex(prev => prev - 1)}
                    className="flex items-center gap-1 disabled:opacity-40"
                  >
                    <ChevronLeft className="size-4" /> Previous
                  </button>

                  <button
                    disabled={activeSectionIndex === sections.length - 1}
                    onClick={() => setActiveSectionIndex(prev => prev + 1)}
                    className="flex items-center gap-1 disabled:opacity-40"
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-3 text-green-700">
                {activeSection.name}
              </h3>

              {/* FORMS */}
              {activeSection.id === 'personal' && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              )}

              {activeSection.id === 'summary' && (
                <ProfessionalSummaryForm
                  data={resumeData.professional_summary}
                  onChange={(value) => setResumeData(prev => ({ ...prev, professional_summary: value }))}
                  setResumeData={setResumeData}
                />
              )}

              {activeSection.id === 'experience' && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(value) => setResumeData(prev => ({ ...prev, experience: value }))}
                />
              )}

              {activeSection.id === 'education' && (
                <EducationForm
                  data={resumeData.education}
                  onChange={(value) => setResumeData(prev => ({ ...prev, education: value }))}
                />
              )}

              {activeSection.id === 'projects' && (
                <ProjectForm
                  data={resumeData.project}
                  onChange={(value) => setResumeData(prev => ({ ...prev, project: value }))}
                />
              )}

              {activeSection.id === 'skills' && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(value) => setResumeData(prev => ({ ...prev, skills: value }))}
                />
              )}

              <button
                onClick={saveResume}
                className='mt-4 bg-green-600 text-white px-4 py-2 rounded w-full'
              >
                Save Changes
              </button>

            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className='lg:col-span-7'>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
              removeBackground={removeBackground}
            />
          </div>

        </div>
      </div>

    </div>
  )
}

export default ResumeBuilder