import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Mail, User, Lock, Phone, ActivitySquare } from 'lucide-react';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        tipoConta: 'medico-generalista',
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        crm: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
        // Aqui você implementaria a lógica de envio para o backend
    };

    const handleCancel = () => {
        setFormData({
            tipoConta: 'medico-generalista',
            nome: '',
            email: '',
            senha: '',
            telefone: '',
            crm: ''
        });
    };

    return (
        <Card className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
            <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-6">Cadastro</h2>

                    <div className="mb-6">
                        <Label className="text-sm font-medium">Tipo de conta</Label>
                        <RadioGroup
                            defaultValue="medico-generalista"
                            name="tipoConta"
                            className="grid gap-2 mt-2"
                            value={formData.tipoConta}
                            onValueChange={(value) => handleInputChange({ target: { name: 'tipoConta', value } })}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="estudante" id="estudante" />
                                <Label htmlFor="estudante">Estudante</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="medico-generalista" id="medico-generalista" />
                                <Label htmlFor="medico-generalista">Médico Generalista</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pediatra" id="pediatra" />
                                <Label htmlFor="pediatra">Pediatra</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                name="nome"
                                placeholder="Nome"
                                value={formData.nome}
                                onChange={handleInputChange}
                                className="pl-10"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="pl-10"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                name="senha"
                                type="password"
                                placeholder="Senha"
                                value={formData.senha}
                                onChange={handleInputChange}
                                className="pl-10"
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                name="telefone"
                                placeholder="Telefone"
                                value={formData.telefone}
                                onChange={handleInputChange}
                                className="pl-10"
                            />
                        </div>

                        <div className="relative">
                            <ActivitySquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                name="crm"
                                placeholder="CRM"
                                value={formData.crm}
                                onChange={handleInputChange}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCancel}
                            className="w-[120px]"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="w-[120px] bg-gray-600 hover:bg-gray-700"
                        >
                            Cadastre-se
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default UserRegistration;