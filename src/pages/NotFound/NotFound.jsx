import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
            <p className="text-xl text-muted-foreground mb-8">
                A página que você está procurando não existe.
            </p>
            <Button onClick={() => navigate('/')}>
                Voltar para Home
            </Button>
        </div>
    );
}