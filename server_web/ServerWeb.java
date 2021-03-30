import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class ServerWeb {
	public static void main(String[] args) throws IOException {
		System.out.println("#########################################################################");
		System.out.println("Serverul asculta potentiali clienti.");

		// pornește un server pe portul 5678 
		ServerSocket serverSocket = new ServerSocket(5678);
		while(true) {
			// așteaptă conectarea unui client la server
			// metoda accept este blocantă
			// clientSocket - socket-ul clientului conectat
			Socket clientSocket = serverSocket.accept();
			System.out.println("S-a conectat un client.");

			// socketWriter - wrapper peste fluxul de ieșire folosit pentru a transmite date clientului
			PrintWriter socketWriter = new PrintWriter(clientSocket.getOutputStream(), true);

			// socketReader - wrapper peste fluxul de intrare folosit pentru a primi date de la client
			BufferedReader socketReader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
			
			// este citită prima linie de text din cerere
			String linieDeStart = socketReader.readLine();
			System.out.println("S-a citit linia de start din cerere: ##### " + linieDeStart + " #####");

			// mesajul citit este transmis la client
			// ne folosim de socketWriter pt a trimite la client
			//# TODO interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
			String[] resursaCeruta = linieDeStart.split(" ");

			//# TODO trimiterea răspunsului HTTP
			socketWriter.println("HTTP/1.1 200 OK\r\n");
			//socketWriter.println("Content-Length: " + resursaCeruta[1].length() + "\r\n");
			//socketWriter.println("Content-Type: text/plain\r\n");
			//socketWriter.println("Server: Vlad\r\n");
			socketWriter.println("\r\n");
			socketWriter.println("Hello world! - " + resursaCeruta[1]);

			// închide conexiunea cu clientul
			// la apelul metodei close() se închid automat fluxurile de intrare și ieșire (socketReader și socketWriter)
			clientSocket.close();
			System.out.println("S-a terminat comunicarea cu clientul.");
		}
		// închide serverul
		//serverSocket.close();
	}
}