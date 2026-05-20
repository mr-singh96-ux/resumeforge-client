import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

const ResumePreview = ({ data, template, accentColor, removeBackground, classes = "" }) => {

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} removeBackground={removeBackground} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} removeBackground={removeBackground} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} removeBackground={removeBackground} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} removeBackground={removeBackground} />;
    }
  }

  return (
    <div className='w-full bg-gray-100 flex justify-center py-6'>

      {/* 🔥 FIXED RESUME CONTAINER */}
      <div
        id="resume-preview"
        className={"bg-white shadow-lg print:shadow-none print:border-none " + classes}
        >
        {renderTemplate()}
      </div>

     <style>
{`
@page {
  size: letter;
  margin: 0;
}

@media print {
  body {
    margin: 0;
  }

  body * {
    visibility: hidden;
  }

  #resume-preview, #resume-preview * {
    visibility: visible;
  }

  #resume-preview {
    position: absolute;
    top: 0;
    left: 0;

    width: 8.5in;
    padding: 0.5in;   /* 🔥 gives proper margins */
  }

}
`}
</style>
    </div>
  )
}

export default ResumePreview