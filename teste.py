import random

palavras = ["python", "computador", "programacao", "jogo"]
palavra_secreta = random.choice(palavras)
letras_corretas = ["_"] * len(palavra_secreta)
tentativas = 6

print("Bem-vindo ao Jogo da Forca!")

while tentativas > 0 and "_" in letras_corretas:
    print(" ".join(letras_corretas))
    letra = input("Digite uma letra: ").lower()
    
    if letra in palavra_secreta:
        for i in range(len(palavra_secreta)):
            if palavra_secreta[i] == letra:
                letras_corretas[i] = letra
        print("Boa! A palavra agora é:", " ".join(letras_corretas))
    else:
        tentativas -= 1
        print(f"Letra errada! Você tem {tentativas} tentativas restantes.")
    
    if "_" not in letras_corretas:
        print("Parabéns, você acertou a palavra:", palavra_secreta)
        break

if tentativas == 0:
    print("Você perdeu! A palavra era:", palavra_secreta)
