
type RatingProps = {
  rating: number | null;
  length?: number;
};

const Rating = ({ rating, length = 5 }: RatingProps) => {
  if (!rating) return <span>—</span>;
  return (
    // Display a filled circle for each rating value
    <span>
      {[...Array(length)].map((_, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: i < rating ? 'darkRed' : '#grey',
            marginRight: '4px',
          }}
        />
      ))}
    </span>
  );
};

export default Rating;