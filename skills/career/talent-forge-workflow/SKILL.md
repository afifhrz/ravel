---
name: talent-forge-workflow
description: Workflow for scraping global remote jobs and tailoring CVs.
---

# TalentForge Workflow

This skill defines the procedure for identifying global remote opportunities and preparing tailored application documents.

## Trigger Conditions
- User requests a job search for remote roles.
- Scheduled job search for specific roles/keywords.

## Procedure
1. **Information Retrieval**
   - **PRIMARY**: Read the user's CV text from `C:\Users\afifs\AppData\Local\hermes\profiles\ravel\household\talent_forge\cv_text.txt`. This is a pre-extracted plain-text version of the main CV — fast and reliable.
   - **FALLBACK**: If `cv_text.txt` is missing or empty, load the main CV PDF from `G:\My Drive\Dokumen Persyaratan Umum\CV\Ahmad_Afif_Aulia_Hariz_CV_Main.pdf` and extract text using the `ocr-and-documents` skill. Also save the extracted text back to `cv_text.txt` for future runs.
   - The CV contains: Profile summary, Key Skills (C#, Python, Java, Go, PHP, JavaScript, React, TypeScript, .NET, Spring Boot, Django, FastAPI, Kafka, Temporal, Redis, AWS, Kubernetes, Docker, etc.), and Professional Experience at The Software Practice (Singapore), Samsung R&D Indonesia, PSN, etc.

2. **Multi-Portal Search (ALL of the following are MANDATORY — do not skip any)**
   - **Greenhouse.io**: Use browser to visit `https://boards.greenhouse.io/boards/embedded_job_board?for=` or search via `https://job-boards.greenhouse.io/` — many companies use Greenhouse as their ATS. Search for "remote" roles and filter for global/anywhere positions. **This is a critical source — do not skip.**
   - **Arc.dev**: Filter for "Remote" and "Global".
   - **Upwork**: Filter for "Fixed-price" or "Hourly" remote contracts.
   - **Arbeitnow**: Filter for "Remote" and check for "No visa required".
   - **RemoteOK**: Search for global remote software engineering roles.
   - **WorkingNomads**: Search for remote tech jobs.
   - **Lever.co (Lever ATS)**: Many tech companies use Lever as their ATS. Search via `https://jobs.lever.co/` with "remote" keyword. Same approach as Greenhouse — company career pages often embed Lever boards.
   - **Workable**: Search `https://apply.workable.com/` for remote roles — another widely-used ATS.
   - **Remotive**: Visit `https://remotive.com/` — curated remote jobs, strong for tech roles.
   - **JustRemote**: Visit `https://justremote.co/` — aggregates global remote positions.
   - **Himalayas**: Visit `https://himalayas.app/` — remote job board with visa/salary transparency.

3. **Filtering & Validation**
   - Scan the "Requirements" or "Location" section for keywords: *Visa, Work Permit, Residency, "Must be located in", "Authorized to work in"*.
   - If any of these are found as constraints, discard the job.

4. **CV & Cover Letter Tailoring**
   - Identify the top 3-5 keywords/skills in the job description.
   - **CV Modification**: Create a tailored version of the user's CV, rewriting the Professional Summary and Experience bullet points to mirror the job's terminology.
   - **Cover Letter**: Generate a concise, high-impact cover letter.
   - **Naming Convention**: Append a datetime suffix (YYYYMMDD_HHMM) to every output file name.
   - Save both documents as PDF or Markdown files in the `talent_forge/outputs/` directory.

5. **Reporting**
   - Format the result for Ravel:
     - Job Title & Company
     - Job Link
     - Match Score (1-10)
     - Tailored CV Path
     - Key "Selling Point" for this application.

## Pitfalls
- **False Remotes**: Many jobs say "Remote" but mean "Remote within the US/EU". Always check for geographic constraints.
- **PDF Formatting**: Ensure the tailored CV maintains professional formatting.
- **Rate Limiting**: Use browser tools carefully to avoid portal blocks.
