
# **Projeto Mind&Learn** - **Relatório de Redes de Computadores**

## 1. **Introdução**

Este relatório documenta a implementação da infraestrutura de rede para o projeto **Mind&Learn**, desenvolvido no laboratório de redes da FESA. A topologia implementada consiste em uma **WAN (Wide Area Network)** interconectando múltiplos estados brasileiros, utilizando equipamentos Cisco reais para simular um ambiente corporativo distribuído.

## 2. **Topologia da Rede**

### 2.1 **Arquitetura Geral**

<img width="2181" height="1203" alt="image" src="https://github.com/user-attachments/assets/a550761d-5588-4ce9-b1dd-6e782bf19bd3" />

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
````

### 3.2 **Configuração do Ambiente de Acesso**

Preparação da Máquin Virtual Ubuntu:

# Configuração de rede na VM
sudo nano /etc/netplan/01-netcfg.yaml

network:
  version: 2
  ethernet:
    eth0:
      dhcp4: false
      addresses: [192.168.1.10/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

sudo netplan apply

## 4. **Esquema de Endereçamento IP**

### 4.1 **Tabela de Sub-redes por Estado**

| **Estado** | **Sub-rede** | **Gateway** | **Máscara** | **Dispositivos** |
|------------|--------------|-------------|-------------|------------------|
| **São Paulo** | 192.168.0.0 | 192.168.0.1 | /24 | Router SP, Switch 1 |
| **Pernambuco** | 192.168.1.0 | 192.168.1.1 | /24 | Router PE |
| **Rio de Janeiro** | 192.168.2.0 | 192.168.2.1 | /24 | Router RJ, Switch 3 |
| **Minas Gerais** | 192.168.3.0 | 192.168.3.1 | /24 | Router MG, Switch 2 |
| **Amapá** | 192.168.4.0 | 192.168.4.1 | /24 | Router AP |
| **Acre** | 192.168.5.0 | 192.168.5.1 | /24 | Router AC |
| **Piauí** | 192.168.6.0 | 192.168.6.1 | /24 | Router PI |
| **Bahia** | 192.168.7.0 | 192.168.7.1 | /24 | Router BA, Switch 4 |

