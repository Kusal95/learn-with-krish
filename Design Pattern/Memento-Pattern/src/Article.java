public class Article {
    private long id;
    private String title;
    private String content;
    private final ArticleCaretaker caretaker=new ArticleCaretaker();

    public Article() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    public void saveToMemento(){
        caretaker.addMemento(new ArticleMemento(id,title,content));
    }

    public void undoFromMemento(){
        ArticleMemento memento=caretaker.getMemento();
        if(memento!=null){
            this.id=memento.getId();
            this.title=memento.getTitle();
            this.content=memento.getContent();
        }
    }
}
