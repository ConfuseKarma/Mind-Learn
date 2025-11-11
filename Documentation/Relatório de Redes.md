
# **Projeto Mind&Learn** - **Relatório de Redes de Computadores**

## 1. **Introdução**

Este relatório documenta a implementação da infraestrutura de rede para o projeto **Mind&Learn**, desenvolvido no laboratório de redes da FESA. A topologia implementada consiste em uma **WAN (Wide Area Network)** interconectando múltiplos estados brasileiros, utilizando equipamentos Cisco reais para simular um ambiente corporativo distribuído.

## 2. **Topologia da Rede**

### 2.1 **Arquitetura Geral**

![Diagrama da Topologia WAN](wan-topology.png)

*A topologia completa da rede WAN será inserida aqui como imagem*

### 2.2 **Especificação dos Equipamentos**
- **Roteadores**: Cisco Series 2800 (1 por estado/grupo)
- **Switches**: Cisco (4 unidades)
- **Firewall**: Cisco ASA
- **Modem**: Cisco

## 3. **Configuração dos Dispositivos**

### 3.1 **Procedimento de Reset e Quebra de Senha**

**Problema Identificado**: 
- Roteadores Cisco 2800 com senha desconhecida
- Impossibilidade de acesso aos modos privilegiados

**Solução Implementada**:
```cisco
// Procedimento de password recovery
Router> enable
Router# configure terminal
Router(config)# config-register 0x2142
Router(config)# exit
Router# reload

// Após reboot
Router> enable
Router# copy startup-config running-config
Router# configure terminal
Router(config)# enable secret nova_senha
Router(config)# config-register 0x2102
Router(config)# exit
Router# copy running-config startup-config
