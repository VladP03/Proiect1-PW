import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.Closeable;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

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

			//# TODO interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
			// testam daca linia de start e null
			if (linieDeStart == null) {
				clientSocket.close();
				System.out.println("S-a terminat comunicarea cu clientul - nu s-a primit niciun mesaj.");
				continue;
			}

			String[] resursaCeruta = linieDeStart.split(" ");		// resursa ceruta e pe index-ul 1 ex:"/index.html"
			String[] formatFisier = resursaCeruta[1].split("\\.");	// formatul fisierului e pe index-ul 1 ex: "html"

			//# TODO trimiterea răspunsului HTTP
			String numeFisier = "../continut" + resursaCeruta[1];
			File file = new File(numeFisier);
			// verificam daca exista resursa
			if (file.exists()) {
				// daca s-a gasit dam un 200 OK
				socketWriter.print(headerAccept);
				socketWriter.print("Content-Length: " + file.length() + "\r\n");
				socketWriter.print("Content-Type: " + getContentType(formatFisier[1]) + "\r\n");
				socketWriter.print("Content-Encoding: gzip\r\n");
				socketWriter.print("Server: ProgramareWeb Server\r\n");
				socketWriter.print("\r\n");
				socketWriter.flush();

				sendFile(clientSocket, numeFisier);
			} else {
				// resursa nu exista
				socketWriter.println(headerNotFound);
				socketWriter.println("\r\n");
			}

			// închide conexiunea cu clientul
			// la apelul metodei close() se închid automat fluxurile de intrare și ieșire (socketReader și socketWriter)
			clientSocket.close();
			System.out.println("S-a terminat comunicarea cu clientul.");
		}
	}

	private static void sendFile(Socket clientSocket, String numeFisier) {
		File file = null;
		FileInputStream fis = null;
		GZIPOutputStream gzip = null;

		try {
			file = new File(numeFisier);
			fis = new FileInputStream(file);
			gzip = new GZIPOutputStream(clientSocket.getOutputStream());

			byte[] buffer = new byte[numeFisier.length()];

			int count;
			while((count = fis.read(buffer)) > 0) {
				gzip.write(buffer, 0, count);
			}

			// aparent merge la gzip daca ii pun .finish();
			gzip.finish();
			gzip.flush();

			fis.close();
			clientSocket.getOutputStream().flush();

		}catch(IOException e) {
			e.printStackTrace();
		} finally {
			closeFile(fis);
		}
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
			case "xml": 
				contentType = "application/xml"; 
				break;
			case "json": 
				contentType = "application/json"; 
				break;

			default: contentType = "text/plain";
		}

		return contentType;
	}

	private static void closeFile(Closeable closeable) {
		if (closeable != null) {
			try {
				closeable.close();
			} catch (IOException ex) {
				// ignore
			}
		}
	}
}
