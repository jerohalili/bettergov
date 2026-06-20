import { ExternalLinkIcon } from 'lucide-react';
import type { ConstitutionFullText } from '../schema';

export default function FullTextReader({
  fullText,
}: {
  fullText: ConstitutionFullText;
}) {
  return (
    <div className='border-t border-gray-200 pt-8 mt-8'>
      <div className='flex items-center justify-between flex-wrap gap-2 mb-6'>
        <h2 className='text-xl font-bold text-gray-900'>Read the Full Text</h2>
        <a
          href={fullText.sourceUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center text-xs text-gray-800 hover:text-primary-600 hover:underline'
        >
          Verbatim text transcribed from source
          <ExternalLinkIcon className='h-3 w-3 ml-1' />
        </a>
      </div>

      <article className='prose prose-sm max-w-none prose-headings:font-semibold'>
        {fullText.preamble && (
          <section className='mb-8'>
            <h3 className='text-base font-semibold text-gray-900 mb-2'>
              Preamble
            </h3>
            <p className='text-gray-800 leading-relaxed whitespace-pre-line'>
              {fullText.preamble}
            </p>
          </section>
        )}

        {fullText.articles.map((article, i) => (
          <section key={i} className='mb-8 scroll-mt-32' id={`art-${i + 1}`}>
            <h3 className='text-base font-semibold text-gray-900 mb-1'>
              {article.heading}
              {article.title ? (
                <span className='block text-sm font-medium text-gray-800 mt-0.5'>
                  {article.title}
                </span>
              ) : null}
            </h3>
            <div className='space-y-3 mt-3'>
              {article.sections.map((section, j) => (
                <p
                  key={j}
                  className='text-gray-800 leading-relaxed whitespace-pre-line'
                >
                  {section.number && (
                    <span className='font-medium text-gray-900'>
                      {section.number.startsWith('WHEREAS') ||
                      section.number === 'WHEREFORE'
                        ? `${section.number.split('_')[0]} `
                        : section.number.startsWith('Article')
                          ? `${section.number}. `
                          : `Section ${section.number}. `}
                    </span>
                  )}
                  {section.text}
                </p>
              ))}
            </div>
          </section>
        ))}
      </article>

      <p className='text-xs text-gray-800 mt-6 pt-4 border-t border-gray-100'>
        Transcribed from{' '}
        <a
          href={fullText.sourceUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='underline hover:text-primary-600'
        >
          {fullText.sourceUrl}
        </a>{' '}
        (last verified {fullText.retrievedDate}). Philippine government works
        such as constitutions are not subject to copyright under Republic Act
        8293, Sec. 176. If you spot a discrepancy against the source, please
        report it.
      </p>
    </div>
  );
}
