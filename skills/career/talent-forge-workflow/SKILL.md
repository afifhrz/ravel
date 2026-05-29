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
   - Load the user's main CV from `G:\My Drive\Dokumen Persyaratan Umum\CV\Ahmad_Afif_Aulia_Hariz_CV_Main.pdf`.
   - Use `ocr-and-documents` skill if the PDF needs text extraction.

2. **Multi-Portal Search**
   - **WeWorkRemotely**: Search for "Remote" categories.
   - **LinkedIn**: Use search queries like `"[Role] remote worldwide"` or `"[Role] remote any location"`.
   - **Arc.dev**: Filter for "Remote" and "Global".
   - **Upwork**: Filter for "Fixed-price" or "Hourly" remote contracts.
   - **Arbeitnow**: Filter for "Remote" and check for "No visa required".

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
