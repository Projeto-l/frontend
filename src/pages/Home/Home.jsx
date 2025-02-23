import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <h1 className="text-4xl font-bold mb-4">Bem-vindo ao MedCom</h1>
            <p className="text-xl text-muted-foreground mb-8">
                Plataforma para profissionais da saúde
            </p>
            <div className="flex gap-4">
                <Button onClick={() => navigate('/register')}>
                    Criar Conta
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                    Ver Dashboard
                </Button>
            </div>
        </div>
    );
}