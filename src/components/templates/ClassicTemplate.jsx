import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor, removeBackground }) => {

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    // ✅ SAFE DATA HANDLING
    const projectsData = data.project || data.projects || [];

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800">

            {/* HEADER */}
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>

                {/* PROFILE IMAGE */}
                {data.personal_info?.image && (
                    <div className="flex justify-center mb-4">
                        <img
                            src={
                                removeBackground
                                    ? `${data.personal_info.image}?tr=e-bgremove`
                                    : data.personal_info.image
                            }
                            alt="profile"
                            className="w-24 h-24 rounded-full object-cover border-2"
                            style={{ borderColor: accentColor }}
                        />
                    </div>
                )}

                <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="size-4" />
                            <span>{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-4" />
                            <span>{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* SUMMARY */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* EXPERIENCE */}
            {data.experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        EXPERIENCE
                    </h2>

                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-4">
                            <h3 className="font-semibold">{exp.position}</h3>
                            <p>{exp.company}</p>
                            <p className="text-sm text-gray-500">
                                {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                            </p>
                            {exp.description && <p className="mt-1">{exp.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* EDUCATION */}
            {data.education?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        EDUCATION
                    </h2>

                    {data.education.map((edu, i) => (
                        <div key={i} className="mb-4">
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <p>{edu.institution}</p>
                            <p className="text-sm text-gray-500">
                                {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                            </p>
                        </div>
                    ))}
                </section>
            )}

            {/* PROJECTS */}
            {projectsData.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        PROJECTS
                    </h2>

                    {projectsData.map((proj, i) => (
                        <div key={i} className="mb-4">
                            <h3 className="font-semibold">
                                {proj.title || proj.name || "Project"}
                            </h3>
                            {proj.description && <p>{proj.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* SKILLS */}
            {data.skills?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        SKILLS
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 rounded text-sm text-white"
                                style={{ backgroundColor: accentColor }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

        </div>
    );
};

export default ClassicTemplate;