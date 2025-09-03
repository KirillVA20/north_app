import { fireEvent, render, screen } from '@testing-library/react';
import { SpotCard } from './spot-card';
import { Provider } from '@test/ui';

const imageUrl =
  'https://yandex-images.clstorage.net/yFf48G215/14c150cP/uiNjwVvqRgOJyFHKsEGdq8dQdGBsrquT3ZgE2UD0F1gjuqMN_3-28lBMCLvPzFXV_GOz9YajXomX6DrvwuU2i283I8UvLuISTH1F20UBHZuXcaG0Xb9uM5hJoPyFZVettnozGzm41NUmvpv8OJvCpAlGNtCnct-9gZubaLfnMmga8SKRi6h2dviZI8yjI7xKpnETkG19zDFb-FQ-prRAzZMtZLhYqDbl9t4Kveq4MmSZl9YQ5jZcfqPIjchWtyN7KyECouiqN3UJOXP8EQKcyUZiYMB-LT8jiUr2fBTk4uwQn0WraeqUBFQciM8pqeA22TWlM7elXG4ROPwZ5Bfw6SlDQkBpuxRmW7hQTtPx_lrXYSAxz89-I4p6VL_HVoL9EJ22OWkpp0Sk3XqemepiB9lkJ4Km5x38cUluaKUmMpjJEoMwmOuWtvnYM88Dch-49nPgcl6_z9GqGNX95ObBfPP9hgr4Coa2JT_6TZvJEgdbB1ZglDVNvkDKTGoXR2Hpa2FTYArIZ1cIOEI-kvHd6ecTMeDers4w6XvG_QQlQZ7T3AcKOcvmdgUeGm35i7CH-XangLZXvm7wyFzphyWxO6micfBJ67anqnlyDyHzX-kFkPPjn2_PgisLph0HlSKfEPwGGfj6VuUmP3ncm4pRdXkWNPIHdA4sQooOSocE8lnK8CPzuHuXJ4mrk94QUQ7r53MwA529b8I5eLQ-tPYzL4OPxFoI2Za1Vhz4HPuJIidbJ6WCpFTsrGAq39mExHCpGKOhkQiIRxdLaKHc0vM-GaUwkMK8D39C2jn1_5aGkvzDvUbaGKmnZDXu6c-IKkPEO7X14obkXnzgKr0Lx6RDqiogE1AruSQlm9iT_qLz38vmM-JD7I38cHtqZu60NPEOAP4Ee_hY10Q37NoeK-pCpytm9iNkhqwN0jkPqBe2MworssFxmToXh_vKkh6i0O3rt2Dgsl_9TeNY6IXMFcbyI';

const spotData = {
  id: 123124,
  name: 'Имя',
  description: 'Описание',
  location: {
    type: 'Point',
    coordinates: [48.2352352, 46.53453],
  },
  previewImageUrl: imageUrl,
  userId: '',
};

describe('Spot Card', () => {
  it('show name', () => {
    render(<SpotCard spot={spotData} />, { wrapper: Provider });
    expect(screen.getByText('Имя')).toBeInTheDocument();
  });
  it('show description', () => {
    render(<SpotCard spot={spotData} />, { wrapper: Provider });
    expect(screen.getByText('Описание')).toBeInTheDocument();
  });
  it('show image', () => {
    render(<SpotCard spot={spotData} />, { wrapper: Provider });
    const image = screen.getByAltText('Spot preview') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageUrl);
  });
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<SpotCard spot={spotData} onClick={handleClick} />, {
      wrapper: Provider,
    });

    fireEvent.click(screen.getByRole('article'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
