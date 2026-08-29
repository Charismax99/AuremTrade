import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center pt-20">
      <Container className="text-center flex flex-col items-center">
        <h1 className="text-9xl font-serif text-gold-500 mb-4">404</h1>
        <h2 className="text-3xl font-medium text-text-primary mb-6">Page Not Found</h2>
        <p className="text-text-secondary max-w-md mb-8">
          The page you are looking for does not exist.
        </p>
        <Button href="/" variant="primary">
          Return to Home
        </Button>
      </Container>
    </div>
  );
}
