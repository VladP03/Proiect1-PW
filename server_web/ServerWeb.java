import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class ServerWeb {

	public static final String headerAccept = "HTTP/1.1 200 OK\r\n";
	public static final String headerNotFound = "HTTP/1.1 404 Not Found\r\n";

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
			String[] resursaCeruta = linieDeStart.split(" ");		// resursa ceruta e pe index-ul 1 ex:"/index.html"
			String[] formatFisier = resursaCeruta[1].split("\\.");	// formatul fisierului e pe index-ul 1 ex: "html"

			//# TODO trimiterea răspunsului HTTP
			// verificam daca exista resursa
			if (existFile(resursaCeruta[1])) {
				// daca s-a gasit dam un 200 OK
				socketWriter.println(headerAccept);
				socketWriter.println("Content-Length: " + getFileSize(resursaCeruta[1]) + "\r\n");
				socketWriter.println("Content-Type: " + getContentType(formatFisier[1]) + "\r\n");
				socketWriter.println("\r\n");

				sendFile(clientSocket, resursaCeruta[1]);

			} else {
				// resursa nu exista
				socketWriter.println(headerNotFound);
			}

			// închide conexiunea cu clientul
			// la apelul metodei close() se închid automat fluxurile de intrare și ieșire (socketReader și socketWriter)
			clientSocket.close();
			System.out.println("S-a terminat comunicarea cu clientul.");
		}
		// închide serverul
		//serverSocket.close();
	}

	private static void sendFile(Socket clientSocket, String resursa) {
		try {
		File fp = new File("D:\\programe\\repository\\proiect-1-VladParaschiv\\continut" + "\\" + resursa);
		byte[] arrByte = new byte[getFileSize(resursa)];
		FileInputStream fis = new FileInputStream(fp);

		int count;
		while((count = fis.read(arrByte)) > 0) {
			clientSocket.getOutputStream().write(arrByte, 0, count);
		}

		fis.close();
		}catch(IOException e) {

		}
	}

	// merge -> poate rezolv ceva sa nu mai folosesc un director dat
	private static boolean existFile(String fileName) {
		String path = "D:\\programe\\repository\\proiect-1-VladParaschiv\\continut" + "\\" + fileName;
		File file = new File(path);

		return file.exists();
	}

	private static int getFileSize(String fileName) {
		String path = "D:\\programe\\repository\\proiect-1-VladParaschiv\\continut" + "\\" + fileName;
		File file = new File(path);

		return (int)file.length();
	}

	private static String getContentType(String extesion) {
		String contentType = "";

		switch(extesion) {
			case "html":
				contentType += "text/html";
				break;
			case "css":
				contentType += "text/css";
				break;
			case "js":
				contentType += "application/js";
				break;
			case "png":
				contentType += "text/png";
				break;
			case "jpg":
			case "jpeg":
				contentType += "text/jpeg";
				break;
			case "gif":
				contentType += "text/gif";
				break;
			case "ico":
				contentType += "image/x-icon";
				break;
		}

		return contentType;
	}
}
