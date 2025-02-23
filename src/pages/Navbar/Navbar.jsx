import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


export function Navbar() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <div className="flex gap-6 items-center">
                    <Link to="/" className="font-bold text-2xl">MedCom</Link>
                    <nav className="flex gap-4">
                        <Link to="/">
                            <Button variant="ghost">Home</Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button variant="ghost">Dashboard</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="ghost">Cadastro</Button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}