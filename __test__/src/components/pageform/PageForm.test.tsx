import { PageForm } from '@/components/PageForm';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('PageForm', () => {
  const titlePage = 'My Page';
  const titleForm = 'My Form';
  const linkHref = '/my-page';
  const linkContent = 'Go to my page';

  it('should render the page', () => {
    const handleSubmit = vi.fn();
    const children = <input type="text" />;
    const { getByText } = render(
      <PageForm
        titlePage={titlePage}
        titleForm={titleForm}
        linkHref={linkHref}
        linkContent={linkContent}
        handleSubmit={handleSubmit}
      >
        {children}
      </PageForm>,
    );

    expect(getByText(titleForm));
    expect(getByText(linkContent));
  });
});
